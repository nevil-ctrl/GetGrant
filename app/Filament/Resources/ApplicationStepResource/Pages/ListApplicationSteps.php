<?php

namespace App\Filament\Resources\ApplicationStepResource\Pages;

use App\Filament\Resources\ApplicationStepResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListApplicationSteps extends ListRecords
{
    protected static string $resource = ApplicationStepResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
