<?php

namespace App\Http\Controllers;

use App\Models\Stores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Photos;

class StoresController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Stores::with("getPhotos")->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = validator()->make($request->all(),[
            'name' => 'required',
            'adress' => 'required',
            'email' => 'required',
            'tel' => 'required',
            'images' => 'required',
        ]);

        // if($validator->fails()){
        //     return response()->json([
        //         'message' => 'Add Store Failed'
        //     ]);
        // }

        $stores = new Stores([
            'name' => $request->input('name'),
            'adress' => $request->input('adress'),
            'email' => $request->input('email'),
            'tel' => $request->input('tel'),
        ]);

        $stores->save();

        $files = $request->file("images");

        $data = new Photos([
            'imageable_type' => Stores::class,
            'imageable_id' => $stores->id,
            'type' => 0 ,
            'path' => 'indir.jpg',
        ]);
        $data->save();
        $data1 = new Photos([
            'imageable_type' =>Stores::class,
            'imageable_id' =>$stores->id,
            'type' => 1,
            'path' => 'indir(1).jpg',

        ]);
        $data1->save();

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Stores  $stores
     * @return \Illuminate\Http\Response
     */
    public function show(Stores $stores)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Stores  $stores
     * @return \Illuminate\Http\Response
     */
    public function edit(Stores $stores)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Stores  $stores
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Stores $stores,$id)
    {
        // $stores=Stores:: find($id);
        // $stores->name =$request->name;

        // $stores->update();

        // try{

        //     return response()->json([
        //         'message'=>'Stores Updated Successfully!!'
        //     ]);

        // }catch(\Exception $e){
        //     \Log::error($e->getMessage());
        //     return response()->json([
        //         'message'=>'Something goes wrong while updating a Stores!!'
        //     ],500);
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Stores  $stores
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stores $stores,$id)
    {
        try {
            $stores = Stores::find($id);
            $stores->delete();

            return response()->json([
                'message'=>'Stores Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a Stores!!'
            ]);
        }
    }
}
