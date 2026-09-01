const projects = [
  {
    key: "cadirkeyfi",
    name: "Çadır Keyfi",
    username: "@cadirkeyfi",
    mark: "ÇK",
  },
  {
    key: "marmarafest",
    name: "Marmara Fest",
    username: "@marmarafest",
    mark: "MF",
  },
  {
    key: "kocaeliplani",
    name: "Kocaeli Planı",
    username: "@kocaeliplani",
    mark: "KP",
  },
  {
    key: "cadirkeyfivoleybol",
    name: "Çadır Keyfi Voleybol",
    username: "@cadirkeyfivoleybol",
    mark: "VK",
  },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4.1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17.4" cy="6.7" r="1.05" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="personal-page">
      <div className="personal-card">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <section className="hero">
          <div className="profile-ring">
            <div className="profile-photo">
              <img
                src="/yemliha-gerek-profile.jpg"
                alt="Yemliha Gerek"
              />
            </div>
          </div>

          <p className="eyebrow">KİŞİSEL KART</p>

          <h1>Yemliha Gerek</h1>

          <p className="subtitle">
            Organizasyon · Etkinlik · Sosyal Projeler
          </p>

          <div className="gold-divider">
            <span />
            <i>◆</i>
            <span />
          </div>
        </section>

        <section className="content">
          <a
            href="/click?link=yemlihagerek"
            className="main-social"
            aria-label="Yemliha Gerek Instagram"
          >
            <div className="main-social-icon">
              <InstagramIcon />
            </div>

            <div className="main-social-text">
              <small>INSTAGRAM</small>
              <strong>@yemlihagerek</strong>
            </div>

            <div className="arrow">
              <ArrowIcon />
            </div>
          </a>

          <div className="section-heading">
            <span />
            <p>PROJELERİM</p>
            <span />
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <a
                key={project.key}
                href={`/click?link=${project.key}`}
                className="project-card"
                aria-label={project.name}
              >
                <div className="project-logo">
                  {project.mark}
                </div>

                <div className="project-info">
                  <strong>{project.name}</strong>
                  <span>{project.username}</span>
                </div>

                <div className="project-arrow">
                  <ArrowIcon />
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="personal-footer">
          <div className="footer-monogram">YG</div>
          <span />
          <p>YEMLİHA GEREK</p>
        </footer>
      </div>
    </main>
  );
}