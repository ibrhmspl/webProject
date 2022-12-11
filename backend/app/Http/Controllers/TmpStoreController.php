<?php

namespace App\Http\Controllers;

use App\Models\Tmp_store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Photos;
use App\Models\Stores;
use App\Models\User;


class TmpStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Tmp_store::get();
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
        ]);

        $tmp_store = new Tmp_store([
            'name' => $request->name,
            'adress' => $request->adress,
            'email' => $request->email,
            'tel' => $request->tel,
            'user_id'=>$request->user_id
        ]);

        $tmp_store->save();


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tmp_store  $tmp_store
     * @return \Illuminate\Http\Response
     */
    public function show(Tmp_store $tmp_store)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tmp_store  $tmp_store
     * @return \Illuminate\Http\Response
     */
    public function edit(Tmp_store $tmp_store)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tmp_store  $tmp_store
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tmp_store = Tmp_store::find($id);
        $user = User::find($tmp_store->user_id);


        $validator = validator()->make($request->all(),[
            'name' => 'required',
            'adress' => 'required',
            'email' => 'required',
            'tel' => 'required',
            'images' => 'required',
        ]);

        $store = new Stores([
            'name' => $tmp_store->name,
            'adress' => $tmp_store->adress,
            'email' => $tmp_store->email,
            'tel' => $tmp_store->tel,
        ]);
        $store->save();
        $user->update(["store_id"=>$store->id,"user_level"=>1]);
        $tmp_store->delete();


        $files = $request->file("images");

        $data = new Photos([
            'imageable_type' => Stores::class,
            'imageable_id' => $store->id,
            'type' => 0 ,
            'path' => 'indir.jpg',
        ]);
        $data->save();
        $data1 = new Photos([
            'imageable_type' =>Stores::class,
            'imageable_id' =>$store->id,
            'type' => 1,
            'path' => 'indir (1).jpg',

        ]);
        $data1->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tmp_store  $tmp_store
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tmp_store $tmp_store)
    {
        //
    }
}
