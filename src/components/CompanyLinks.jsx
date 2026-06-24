import './CompanyLinks.css'

const links = [
  {
    name: '铁路12306',
    icon: '/images/company/铁路12306.png',
    url: 'https://www.12306.cn/',
  },
  {
    name: '武汉地铁',
    icon: '/images/company/武汉地铁.png',
    url: 'https://www.wuhanrt.com/',
  },
  {
    name: '武汉文旅',
    icon: '/images/company/武汉文旅.png',
    url: 'https://wlj.wuhan.gov.cn/',
  },
]

export default function CompanyLinks() {
  return (
    <section className="company-links">
      <div className="container">
        <h2 className="company-links__title">便捷服务</h2>
        <div className="company-links__row">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="company-links__item"
              title={link.name}
            >
              <img src={link.icon} alt={link.name} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
