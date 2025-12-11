<?php

namespace App\Filament\Resources\ApplicationStepResource\Pages;

use App\Filament\Resources\ApplicationStepResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditApplicationStep extends EditRecord
{
    protected static string $resource = ApplicationStepResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
