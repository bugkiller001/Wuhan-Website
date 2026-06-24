import { useState } from 'react'
import './AboutPage.css'

/* 作品集占位数据 */
const imageFiles = [
  'IMG20230901183746.jpg','IMG20230904100205-01.jpeg','IMG20230904125015-01.jpeg',
  'IMG20230905201413.jpg','IMG20230906190239-01.jpeg','IMG20230906193514.jpg',
  'IMG20230906202131_edit_138623779964263.jpg','IMG_20240203_184105.jpg',
  'IMG_20240331_131121_edit_47623762197940.jpg','IMG_20240906_113313.jpg',
  'IMG_20241104_193532.jpg','IMG_20250101_212644.jpg','IMG_20250405_163131.jpg',
  'IMG_20260412_060345.jpg','IMG_20260413_181749_1.jpg','IMG_20260413_202610.jpg',
  'IMG_20260414_080512.jpg','IMG_20260414_114246_2.jpg','IMG_20260414_122850.jpg',
  'IMG_20260414_132748_1.jpg','IMG_20260414_202404.jpg','IMG_20260503_083535_1.jpg',
  'IMG_20260504_173811.jpg','IMG_20260603_193031.jpg','IMG_20260606_173100.jpg',
  'IMG_20260609_200621.jpg',
]
const locations = [
  '厦门','杭州·灵隐寺','杭州·西湖','上海','上海·外滩','上海·外滩','上海·外滩',
  '北京·潮白河','厦门·地铁1号线 集美学村','北京·国家体育场','北京·雁西湖',
  '燕郊','燕郊·天洋城','湖北·广水','武汉·江汉路','武汉·江汉路','武汉·西湖',
  '武汉·大智路','武汉·叶湘伦','武汉·巴公房子','武汉·江汉路','北京·国贸',
  '北京·798艺术中心','宣化·鼓楼','宣化·九龙壁','宣化·图书馆',
]
const galleryItems = imageFiles.map((f, i) => ({
  id: i + 1,
  img: `/images/about/image/${f}`,
  location: locations[i],
}))

const equipmentA = {
  name: 'HUAWEI Mate70 Pro+',
  img: '/images/about/device/phone.png',
  specs: [
    '后置摄像头：50MP 超光变主摄（F1.4-F4.0 可变光圈）',
    '超广角：40MP',
    '长焦：48MP 微距长焦',
    '影像芯片：XD Fusion Pro',
    '视频能力：4K 120fps 慢动作，超级夜景视频',
    '特色：风驰闪拍、物理光圈可调',
  ],
}

const equipmentB = {
  name: 'DJI Pocket 3',
  img: '/images/about/device/pocket3.png',
  specs: [
    '传感器：1 英寸 CMOS',
    '镜头：20mm F2.0',
    '视频：4K/120fps，慢动作，10-bit D-Log M',
    '云台：三轴机械增稳',
    '屏幕：2 英寸旋转触控屏',
    '特色：智能跟随 6.0，立体声收音，小巧便携',
  ],
}

function EquipmentCard({ data }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="about-equip__card" onClick={() => setOpen(true)}>
        <img src={data.img} alt={data.name} loading="lazy" />
        <span className="about-equip__name">{data.name}</span>
        <span className="about-equip__hint">点击查看参数</span>
      </div>
      {open && (
        <div className="about-equip__overlay" onClick={() => setOpen(false)}>
          <div className="about-equip__panel" onClick={(e) => e.stopPropagation()}>
            <button className="about-equip__close" onClick={() => setOpen(false)}>✕</button>
            <img src={data.img} alt={data.name} className="about-equip__panel-img" />
            <h3>{data.name}</h3>
            <ul>{data.specs.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        </div>
      )}
    </>
  )
}

export default function AboutPage() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="about-page">
      <div className="container">
        {/* 头像与姓名 */}
        <section className="about-hero">
          <div className="about-hero__avatar">
            <img src="/images/about/icon/me.png" alt="头像" />
          </div>
          <h1 className="about-hero__name">陈浩轩</h1>
          <p className="about-hero__en">Ke Chen</p>
        </section>

        {/* 拍摄设备 */}
        <section className="about-equip">
          <h2 className="about-section__title">
            <span className="about-section__icon">📸</span>
            <span>我的拍摄伙伴</span>
            <span className="about-section__underline" />
          </h2>
          <div className="about-equip__row">
            <EquipmentCard data={equipmentA} />
            <EquipmentCard data={equipmentB} />
          </div>
        </section>

        {/* 个人素材展示 */}
        <section className="about-gallery">
          <h2 className="about-section__title">
            <span className="about-section__icon">🖼️</span>
            <span>我的镜头日记</span>
            <span className="about-section__flag">📸</span>
          </h2>
          <div className="about-gallery__grid">
            {galleryItems.map((item) => (
              <div key={item.id} className="about-gallery__card" onClick={() => setLightbox(item)}>
                <img src={item.img} alt={item.location} loading="lazy" />
                <span className="about-gallery__loc">📍 {item.location}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 我想说的话 */}
        <section className="about-message">
          <div className="about-message__card">
            <div className="about-message__decor">⭐ 🌙 ✨</div>
            <h2 className="about-section__title">
              <span className="about-section__icon">💬</span>
              <span>写给自己</span>
            </h2>
            <p className="about-message__text">
              Just do it.📷✨<br />
              每一次快门，都是与美好相遇的证明。
            </p>
            <div className="about-message__divider" />
          </div>
        </section>
      </div>

      {/* 灯箱 */}
      {lightbox && (
        <div className="about-lightbox" onClick={() => setLightbox(null)}>
          <div className="about-lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="about-lightbox__close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.img} alt={lightbox.location} />
            <p className="about-lightbox__loc">📍 拍摄于：{lightbox.location}</p>
          </div>
        </div>
      )}
    </div>
  )
}
