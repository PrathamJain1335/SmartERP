import React from "react";

export default function Main({ activePage, data, handlers, pageComponents, getComponent }) {
  const PageComponent = getComponent(activePage);

  return (
    <main className="p-6 bg-[var(--bg)] dark:bg-[var(--bg)] min-h-[calc(100vh-64px)]">
      <PageComponent data={data} handlers={handlers} />
    </main>
  );
}
