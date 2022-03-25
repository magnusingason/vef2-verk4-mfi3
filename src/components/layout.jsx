


export function Layout({ title, children, footer }) {
    return (
      <div>
        <header>
          <h1>{title}</h1>
        </header>
        <main >
          {children}
        </main>
        <footer >{footer}</footer>
      </div>
    )
  }