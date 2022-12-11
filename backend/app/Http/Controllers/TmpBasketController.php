<?php

namespace App\Http\Controllers;

use App\Models\Tmp_basket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Photos;
use Illuminate\Support\Facades\File;

class TmpBasketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    public function index()
    {
        return Tmp_basket::with("getPhotos")->get();
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

        // if($validator->fails()){
        //     return response()->json([
        //         'message' => 'Add Product Failed'
        //     ]);
        // }

        $tmp_basket = new Tmp_basket([
            'store_id' => $request->input('store_id'),
            'product_id' => $request->input('product_id'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock')
        ]);

        $tmp_basket->save();

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

            $data->imageable_type = Tmp_basket::class;
            $data->imageable_id = $tmp_basket->id;
            $data->type = $i;
            $data->path = $imageName;
            $data->save();
            $i +=1;
        }

        $newData = $tmp_basket->load("getPhotos");

        return $newData;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tmp_basket  $tmp_basket
     * @return \Illuminate\Http\Response
     */
    public function show(Tmp_basket $tmp_basket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tmp_basket  $tmp_basket
     * @return \Illuminate\Http\Response
     */
    public function edit(Tmp_basket $tmp_basket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tmp_basket  $tmp_basket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tmp_basket $tmp_basket)
    {
        $tmp_basket->delete();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tmp_basket  $tmp_basket
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tmp_basket $tmp_basket)
    {
        //
    }
}
