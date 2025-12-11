<?php

namespace App\Filament\Resources\UserDocumentResource\Pages;

use App\Filament\Resources\UserDocumentResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateUserDocument extends CreateRecord
{
    protected static string $resource = UserDocumentResource::class;
}
