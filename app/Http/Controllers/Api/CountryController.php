<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Список стран.
     * GET /api/countries
     */
    public function index(Request $request): JsonResponse
    {
        $query = Country::query()->where('is_active', true);

        if ($search = $request->get('search')) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $countries = $query->paginate(20);

        return response()->json($countries);
    }

    /**
     * Создание страны.
     * POST /api/countries
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'            => ['required', 'string', 'max:255'],
            'code'            => ['required', 'string', 'max:3', 'unique:countries,code'],
            'flag'            => ['nullable', 'string', 'max:255'],
            'description'     => ['nullable', 'string'],
            'is_active'       => ['sometimes', 'boolean'],
            'selling_points'  => ['nullable', 'array'],
            'selling_points.*'=> ['string'],
        ]);

        $country = Country::create($data);

        return response()->json($country, 201);
    }

    /**
     * Детальная информация о стране.
     * GET /api/countries/{id}
     */
    public function show(int $id): JsonResponse
    {
        $country = Country::with([
            'universities' => function ($query) {
                $query->where('is_active', true);
            },
        ])->findOrFail($id);

        return response()->json($country);
    }

    /**
     * Обновление страны.
     * PUT/PATCH /api/countries/{id}
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $country = Country::findOrFail($id);

        $data = $request->validate([
            'name'            => ['sometimes', 'string', 'max:255'],
            'code'            => ['sometimes', 'string', 'max:3', 'unique:countries,code,' . $country->id],
            'flag'            => ['nullable', 'string', 'max:255'],
            'description'     => ['nullable', 'string'],
            'is_active'       => ['sometimes', 'boolean'],
            'selling_points'  => ['nullable', 'array'],
            'selling_points.*'=> ['string'],
        ]);

        $country->update($data);

        return response()->json($country);
    }

    /**
     * Удаление страны.
     * DELETE /api/countries/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $country = Country::findOrFail($id);
        $country->delete();

        return response()->json(['message' => 'Country deleted successfully']);
    }
}
?>