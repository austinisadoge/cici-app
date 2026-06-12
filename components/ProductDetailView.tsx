'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { useCart } from '@/lib/cart'
import { seriesById, categoryById, type Product } from '@/lib/products'
import type { ProductDetail } from '@/lib/catalog'

export function ProductDetailView({ product }: { product: ProductDetail }) {
  const { lang, cur, t } = useI18n()
  const { add, open } = useCart()
  const [selected, setSelected] = useState(0)
  const [added, setAdded] = useState(false)

  const s = seriesById(product.series)
  const c = categoryById(product.category)
  const price = cur === 'rm' ? `RM ${product.price.myr.toLocaleString()}` : `NT$ ${product.price.twd.toLocaleString()}`
  const desc = lang === 'zh' ? product.description.zh : product.description.en
  const soldOut = product.stock === 'sold-out'

  const cartProduct: Product = {
    id: product.id,
    slug: product.slug,
    series: product.series,
    category: product.category,
    name: product.name,
    meta: product.meta,
    price: product.price,
    stock: product.stock,
    isNew: product.isNew,
    image: product.images[0],
  }

  const onAdd = () => {
    if (added) return // 回饋期間擋連點，避免誤加兩件
    add(cartProduct)
    open()
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <main className="pd">
      <div className="container-x">
        <div className="pd-crumb">
          <Link href="/shop">{t('全部作品', 'All Pieces')}</Link>
          <span>／</span>
          <Link href={`/shop?series=${s.id}`}>{t(s.name.zh, s.name.en)}</Link>
          <span>／</span>
          <Link href={`/shop?series=${s.id}&category=${c.id}`}>{t(c.name.zh, c.name.en)}</Link>
        </div>

        <div className="pd-grid">
          <div className="pd-gallery">
            <div className="pd-main">
              <img src={product.images[selected]} alt={t(product.name.zh, product.name.en)} />
              {soldOut && <span className="badge">{t('售罄', 'Sold out')}</span>}
              {!soldOut && product.isNew && <span className="badge dark">{t('新品', 'New')}</span>}
            </div>
            {product.images.length > 1 && (
              <div className="pd-thumbs">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    className={`pd-thumb ${i === selected ? 'on' : ''}`}
                    onClick={() => setSelected(i)}
                    aria-label={`Photo ${i + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pd-info">
            <span className="kicker">
              {t(s.name.zh, s.name.en)}．{t(c.name.zh, c.name.en)}
            </span>
            <h1 className="serif">
              {t(product.name.zh, product.name.en)}
              <span className="pd-name-alt">{t(product.name.en, product.name.zh)}</span>
            </h1>
            {(product.meta.zh || product.meta.en) && (
              <div className="pd-meta">{t(product.meta.zh, product.meta.en)}</div>
            )}
            <div className="pd-price serif">
              {price}
              {product.stock === 'made-to-order' && (
                <span className="pd-price-note">{t('（客製參考價，細節以討論為準）', '(guide price, final after we discuss)')}</span>
              )}
            </div>

            <div className="pd-stock">
              {product.stock === 'in-stock' && t('現貨．48 小時內出貨', 'In stock · Ships within 48 hours')}
              {product.stock === 'made-to-order' && t('訂製．3–7 個工作天出貨', 'Made to order · Ships in 3–7 business days')}
              {soldOut && t('已售罄．可詢問客製', 'Sold out · Custom order available')}
            </div>

            {soldOut ? (
              <Link href="/custom" className="btn pd-add">
                {t('詢問客製 →', 'ASK FOR CUSTOM →')}
              </Link>
            ) : (
              <button type="button" className="btn pd-add" onClick={onAdd}>
                {added ? t('已加入 ✓', 'ADDED ✓') : t('加入購物袋', 'ADD TO BAG')}
              </button>
            )}

            {desc && (
              <div className="pd-desc">
                {desc.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            <div className="pd-notes">
              <div>
                <b>{t('手作說明', 'About the craft')}</b>
                <span>
                  {t(
                    '每一件都是手工編成，紋理與色澤會有細微差異，這是手作的印記。',
                    'Each piece is woven by hand. Small variations in texture and colour are the mark of the craft.'
                  )}
                </span>
              </div>
              <div>
                <b>{t('寄送', 'Shipping')}</b>
                <span>
                  {t(
                    '台灣 NT$60（滿 NT$1,500 免運）．馬來西亞 RM35 起（滿 RM300 免運）',
                    'Taiwan NT$60 (free over NT$1,500) · Malaysia from RM35 (free over RM300)'
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
