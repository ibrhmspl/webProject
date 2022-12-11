<?php

namespace App\Http\Controllers;

use App\Models\MainCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MainCategoriesController extends Controller
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
        $mainCategories=MainCategories::all();
        return response()->json(['MainCategories'=>$mainCategories]);
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
        Validator::make($request->all(), [
            'name' => ['required']
        ])->validate();

       $data= MainCategories::create($request->all());

        try{
            return response()->json(['MainCategories'=>$data]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a Category!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MainCategories  $mainCategories
     * @return \Illuminate\Http\Response
     */
    public function show(MainCategories $mainCategories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MainCategories  $mainCategories
     * @return \Illuminate\Http\Response
     */
    public function edit(MainCategories $mainCategories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MainCategories  $mainCategories
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,MainCategories $mainCategories,$id)
    {
        $mainCategories=MainCategories:: find($id);

        $mainCategories->name =$request->name;

        $mainCategories->update();

        try{

            return response()->json([
                'message'=>'Category Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a Category!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MainCategories  $mainCategories
     * @return \Illuminate\Http\Response
     */
    public function destroy(MainCategories $mainCategories,$id)
    {
        try {
            $mainCategories = MainCategories::find($id);
            $mainCategories->delete();

            return response()->json($mainCategories);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a category!!'
            ]);
        }
    }
}
