import React from "react";

interface CountriesPageProps {
  onNavigate?: (page: string) => void;
}

export default function CountriesPage({ onNavigate }: CountriesPageProps) {
    return <div className="p-8 text-xl">Каталог стран появится здесь.</div>;
}
