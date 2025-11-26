import React from "react";

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
    return <div className="p-8 text-xl">О проекте GetGrant: сервис для поступления в зарубежные университеты.</div>;
}
