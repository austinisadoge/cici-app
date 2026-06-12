'use client'

import { useI18n } from '@/lib/i18n'
import { useCart } from '@/lib/cart'
import { seriesById, type Product } from '@/lib/products'
import { Price } from '../Price'

type Lex = { zh: string; en: string }

interface Props {
  id: string
  kicker: Lex
  title: Lex
  viewAll: Lex
  products: Product[]
}

export function ProductSection({ id, kicker, title, viewAll, products }: Props) {
  const { t } = useI18n()
  const { add, open } = useCart()
  return (
    <section className="sec" id={id}>
      <div className="container-x">
        <div className="sec-head">
          <div>
            <span className="kicker">{t(kicker.zh, kicker.en)}</span>
            <h2 className="serif">{t(title.zh, title.en)}</h2>
          </div>
          <a className="view-all">{t(viewAll.zh, viewAll.en)}</a>
        </div>
        <div className="grid-3">
          {products.map(p => (
            <div key={p.id} className="card">
              <div className="ph">
                <span className={`badge ${p.isNew ? 'dark' : ''}`}>
                  {p.stock === 'sold-out'
                    ? t('售罄', 'Sold out')
                    : p.isNew
                      ? t('新品', 'New')
                      : p.stock === 'made-to-order'
                        ? t('客製訂製', 'Made to order')
                        : t('現貨', 'In stock')}
                </span>
                <img src={p.image} alt={t(p.name.zh, p.name.en)} />
                {p.stock !== 'sold-out' && (
                  <button
                    type="button"
                    className="card-add"
                    onClick={(e) => {
                      e.stopPropagation()
                      add(p)
                      open()
                    }}
                    aria-label={t('加入購物袋', 'Add to bag')}
                  >
                    +
                  </button>
                )}
              </div>
              <div className="card-series">
                {t(seriesById(p.series).name.zh, seriesById(p.series).name.en)}
              </div>
              <div className="name">{t(p.name.zh, p.name.en)}</div>
              <div className="meta">{t(p.meta.zh, p.meta.en)}</div>
              <Price twd={p.price.twd} myr={p.price.myr} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
