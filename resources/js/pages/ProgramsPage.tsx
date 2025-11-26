import React from "react";

interface ProgramsPageProps {
  onNavigate?: (page: string) => void;
}

export default function ProgramsPage({ onNavigate }: ProgramsPageProps) {
    return <div className="p-8 text-xl">Каталог программ появится здесь.</div>;
}
