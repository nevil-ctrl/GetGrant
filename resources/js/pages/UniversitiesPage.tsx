import React from "react";

interface UniversitiesPageProps {
  onNavigate?: (page: string) => void;
}

export default function UniversitiesPage({ onNavigate }: UniversitiesPageProps) {
    return <div className="p-8 text-xl">Каталог университетов появится здесь.</div>;
}
