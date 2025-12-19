@extends('layouts.app', ['title' => $country->name . ' | Страна поступления'])

@section('content')
<section class="container-custom py-12 space-y-10">

    <a href="{{ route('pages.countries') }}" class="inline-block text-sm text-[#1055b2] hover:text-[#003b8a]">&larr; Все страны</a>

    <div class="flex items-start gap-4">
        <img src="{{ $country->flag }}" alt="{{ $country->name }}" class="w-10 h-7 rounded-sm object-cover">
        <div class="space-y-1">
            <h1 class="text-3xl font-bold text-[#1A1A1A]">{{ $country->name }}</h1>
            @if($country->description)
                <p class="text-[#6D7A89] max-w-2xl">{{ $country->description }}</p>
            @endif
        </div>
    </div>

    @if(!empty($country->selling_points) && is_array($country->selling_points))
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            @foreach($country->selling_points as $point)
                <div class="p-4 bg-white rounded-xl border border-border/60 shadow-sm flex gap-2 text-sm text-[#1A1A1A]">
                    <span class="text-[#1055b2]">•</span> {{ $point }}
                </div>
            @endforeach
        </div>
    @endif

    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-[#1A1A1A]">Университеты</h2>
            <a href="{{ route('pages.universities') }}?country={{ $country->id }}" class="text-sm font-semibold text-[#1055b2] hover:text-[#003b8a]">Смотреть все</a>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            @forelse($universities as $uni)
                <article class="p-5 bg-white rounded-xl border border-border/60 shadow-sm space-y-2">
                    <div class="text-xs text-[#6D7A89] uppercase tracking-wide">Рейтинг: {{ $uni->ranking ?? '—' }}</div>
                    <div class="text-lg font-semibold text-[#1A1A1A]">{{ $uni->name }}</div>
                    <div class="text-sm text-[#6D7A89] line-clamp-3">{{ $uni->description }}</div>
                    <div class="text-xs text-[#6D7A89]">Программ: {{ $uni->programs_count ?? 0 }}</div>
                    <a href="{{ route('pages.universities.show', $uni) }}" class="inline-flex text-sm font-semibold text-[#1055b2] hover:text-[#003b8a]">Подробнее</a>
                </article>
            @empty
                <p class="text-sm text-[#6D7A89]">Университеты не найдены.</p>
            @endforelse
        </div>
    </div>
</section>
@endsection
