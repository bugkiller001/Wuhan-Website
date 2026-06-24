import './Footer.css'

/**
 * Footer 底部收尾页面
 * - 紧凑排版，减少留白
 * - 包含：数据一览、拍摄设备、联系方式、拍摄地点、精选语录
 */
export default function Footer() {
  const equipment = [
    { label: '相机', value: 'Sony α7R V' },
    { label: '常用镜头', value: 'FE 24-70mm F2.8 GM II' },
    { label: '长焦镜头', value: 'FE 70-200mm F2.8 GM II' },
    { label: '无人机', value: 'DJI Mavic 3 Pro' },
    { label: '后期软件', value: 'Adobe Lightroom / Photoshop' },
  ]

  const locations = [
    '黄鹤楼 · 武昌',
    '东湖风景区 · 武昌',
    '武汉长江大桥 · 汉阳',
    '户部巷 · 武昌',
    '湖北省博物馆 · 武昌',
    '武汉大学 · 珞珈山',
    '归元寺 · 汉阳',
    '汉口江滩 · 江岸',
    '光谷步行街 · 洪山',
    '楚河汉街 · 武昌',
    '晴川阁 · 汉阳',
    '木兰天池 · 黄陂',
  ]

  return (
    <footer id="about" className="footer">
      <div className="footer__inner container">
        {/* 顶部装饰线 */}
        <div className="footer__rule" />

        {/* 三列内容 */}
        <div className="footer__columns">
          {/* 列一：拍摄设备清单 */}
          <div className="footer__column">
            <h3 className="footer__column-title">拍摄设备</h3>
            <ul className="footer__equipment-list">
              {equipment.map((item) => (
                <li key={item.label} className="footer__equipment-item">
                  <span className="footer__equipment-label">{item.label}</span>
                  <span className="footer__equipment-value">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 列二：联系方式 + 精选语录 */}
          <div className="footer__column">
            <h3 className="footer__column-title">联系方式</h3>
            <div className="footer__contact">
              <p className="footer__contact-item">
                <span className="footer__contact-icon">✉</span>
                <span>Email：1516955019@qq.com</span>
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">☊</span>
                <span>微信：Cchx050804</span>
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">☍</span>
                <span>小红书: 6717821016</span>
              </p>
            </div>

            {/* 精选语录 */}
            <blockquote className="footer__quote">
              <p>「武汉，每天不一样。」</p>
              <cite>—— 这座城市教会我，<br />最好的照片永远是下一张。</cite>
            </blockquote>
          </div>

          {/* 列三：拍摄地点汇总 */}
          <div className="footer__column">
            <h3 className="footer__column-title">拍摄地点</h3>
            <ul className="footer__locations-list">
              {locations.map((loc) => (
                <li key={loc} className="footer__location-item">
                  {loc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 武汉城市影像记录 · 用镜头讲述江城故事
          </p>
        </div>
      </div>
    </footer>
  )
}
