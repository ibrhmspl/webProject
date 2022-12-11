<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Tmp_worker;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function index()
    {
        $user=User::get();
        return response()->json($user);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

       // return $this -> respondWithToken($token);
        return response() -> json([
            'user' => auth() -> user(),
            'token' =>  $this -> respondWithToken($token)->original
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
    public function register()
    {
        $validator= validator()->make(request()->all(),[
            'name'      => 'required | string',
            'email'     => 'required | email',
            'password'  => 'required | string'
        ]);

        if($validator->fails()){
            return response()-> json([
                'message'   => request()->get('name'). ' '. request()-> get('email'). ' ' . request()-> get('password')
            ]);
        }
        if ( request()->get('key')) {
            $tmp=Tmp_worker::where('key',request()->get('key'))->first();
            $data =User::create([
                'name'      => request()->get('name'),
                'email'     => request()->get('email'),
                'password'  => bcrypt( request()->get('password')),
                'user_level'=> "2",
                'store_id'  =>$tmp->store_id,

            ]);
        }
        else{
            $data =User::create([
                'name'      => request()->get('name'),
                'email'     => request()->get('email'),
                'password'  => bcrypt( request()->get('password')),
                'user_level'=> "3",

            ]);
        }
            return $data;

    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
