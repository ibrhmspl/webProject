<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use App\Models\Photos;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
class ProductsController extends Controller
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
        return Products::get();
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
            'name' => ['required'],
            'description' => ['required'],
            'main_category_id' => ['required']
        ])->validate();

       $data= Products::create($request->all());

        try{
            return response()->json(['Products'=>$data]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a Products!!'
            ],500);
        }


        // $files = $request->file("images");


        // $i = 0 ;
        // foreach ($files as $file) {
        //     $data = new Photos();

        //     $imageName = time().'_'. $file->getClientOriginalName();
        //     $file->move(\public_path('Image'),$imageName);

        //     $data->imageable_type = Products::class;
        //     $data->imageable_id = $products->id;
        //     $data->type = $i;
        //     $data->path = $imageName;
        //     $data->save();
        //     $i +=1;
        // }

        // $newData = $products->load();

        // return $newData;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(Products $products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit(Products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $products,$id)
    {
        $products=Products::find($id);
        $products->name = $request->name;
        $products->description = $request->description;
        $products->update();

        // $files = $request->file("images");
        // $oldData = Photos::where("imageable_id",$products->id)->get();

        // // return $request->file("images");

        // for ($i=0; $i < 3; $i++) {
        //     $imageName = time().'_'. $files[$i]->getClientOriginalName();
        //     $files[$i]->move(\public_path('Image'),$imageName);
        //     unlink("Image/".$oldData[$i]->path);
        //     $oldData[$i]->path = $imageName;
        //     $oldData[$i]->update();
        // }
        try{

            return response()->json($products);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a Products!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $products,$id)
    {
        try {
            $products = Products::find($id);
            $products->delete();

            return response()->json([
                'message'=>'Products Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a Products!!'
            ]);
        }
    }
}
