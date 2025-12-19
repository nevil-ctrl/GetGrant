<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function countries()
    {
        $countries = Country::withCount('universities')->paginate(9);
        return view('pages.countries.index', compact('countries'));
    }

    public function country(Country $country)
    {
        $universities = $country->universities()->withCount('programs')->get();
        return view('pages.countries.show', compact('country', 'universities'));
    }
}
