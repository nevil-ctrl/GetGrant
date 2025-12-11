<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApplicationStep;
use Illuminate\Http\Request;

class ApplicationStepController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ApplicationStep::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return ApplicationStep::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return ApplicationStep::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $step = ApplicationStep::findOrFail($id);
        $step->update($request->all());
        return $step;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return ApplicationStep::destroy($id);
    }
}
