<?php

namespace App\Filament\Resources\UserDocumentResource\Pages;

use App\Filament\Resources\UserDocumentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListUserDocuments extends ListRecords
{
    protected static string $resource = UserDocumentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
