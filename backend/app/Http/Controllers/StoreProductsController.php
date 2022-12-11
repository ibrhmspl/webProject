<?php

namespace App\Http\Controllers;

use App\Models\StoreProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Photos;
use Illuminate\Support\Facades\File;

class StoreProductsController extends Controller
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
        return StoreProducts::with("getPhotos")->get();
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
            'store_id' => 'required',
            'product_id' => 'required',
            'price' => 'required',
            'stock' =>'required',
            'images' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Add Product Failed'
            ]);
        }

        $storeProducts = new StoreProducts([
            'store_id' => $request->input('store_id'),
            'product_id' => $request->input('product_id'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock')
        ]);

        $storeProducts->save();

        // try{
        //     return response()->json([
        //         'message'=>'StoreProducts Created Successfully!!'
        //     ]);
        // }catch(\Exception $e){
        //     \Log::error($e->getMessage());
        //     return response()->json([
        //         'message'=>'Something goes wrong while creating a StoreProducts!!'
        //     ],500);
        // }

        $files = $request->file("images");


        $i = 0 ;
        foreach ($files as $file) {
            $data = new Photos();

            $imageName = time().'_'. $file->getClientOriginalName();
            $file->move(\public_path('Image'),$imageName);

            $data->imageable_type = StoreProducts::class;
            $data->imageable_id = $storeProducts->id;
            $data->type = $i;
            $data->path = $imageName;
            $data->save();
            $i +=1;
        }

        $newData = $storeProducts->load("getPhotos");

        return $newData;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StoreProducts  $storeProducts
     * @return \Illuminate\Http\Response
     */
    public function show(StoreProducts $storeProducts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StoreProducts  $storeProducts
     * @return \Illuminate\Http\Response
     */
    public function edit(StoreProducts $storeProducts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StoreProducts  $storeProducts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StoreProducts $storeProducts,$id)
    {
        $storeProducts=StoreProducts:: find($id);
        $storeProducts->price =$request->price;
        $storeProducts->stock =$request->stock;


        $storeProducts->update();

        $files = $request->file("images");
        $oldData = Photos::where("imageable_id",$storeProducts->id)->get();

        // return $request->file("images");

        for ($i=0; $i < 3; $i++) {
            $imageName = time().'_'. $files[$i]->getClientOriginalName();
            $files[$i]->move(\public_path('Image'),$imageName);
            unlink("Image/".$oldData[$i]->path);
            $oldData[$i]->path = $imageName;
            $oldData[$i]->update();
        }

        try{

            return response()->json([
                'message'=>'StoreProducts Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a StoreProducts!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StoreProducts  $storeProducts
     * @return \Illuminate\Http\Response
     */
    public function destroy(StoreProducts $storeProducts,$id)
    {
        try {
            $storeProducts = StoreProducts::find($id);
            $storeProducts->delete();

            return response()->json([
                'message'=>'StoreProducts Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a StoreProducts!!'
            ]);
        }
    }
}
