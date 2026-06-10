'use client'

import { useI18n } from '@/lib/i18n'
import { useCart, findProduct } from '@/lib/cart'
import { calcShipping, amountToFreeShipping } from '@/lib/shipping'

export function CartDrawer() {
  const { cur, t } = useI18n()
  const {
    items,
    isOpen,
    close,
    updateQuantity,
    remove,
    subtotal,
    itemCount,
  } = useCart()

  const sub = cur === 'rm' ? subtotal.myr : subtotal.twd
  const shipping = calcShipping(cur, sub)
  const toFree = amountToFreeShipping(cur, sub)
  const total = sub + shipping
  const symbol = cur === 'rm' ? 'RM' : 'NT$'

  return (
    <>
      {isOpen && <div className="drawer-backdrop" onClick={close} />}
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-head">
          <h3 className="serif">
            {t('購物袋', 'Your Bag')} ({itemCount})
          </h3>
          <button
            type="button"
            className="drawer-close"
            onClick={close}
            aria-label={t('關閉', 'Close')}
          >
            ×
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty">
              {t('購物袋是空的', 'Your bag is empty.')}
            </div>
          ) : (
            <>
              {toFree > 0 ? (
                <div className="free-ship-bar">
                  {t(
                    `再買 ${symbol} ${toFree.toLocaleString()} 享免運`,
                    `Add ${symbol} ${toFree.toLocaleString()} for free shipping`
                  )}
                </div>
              ) : (
                <div className="free-ship-bar">
                  {t('已享免運 ✓', 'Free shipping unlocked ✓')}
                </div>
              )}
              {items.map(item => {
                const p = findProduct(item.productId)
                if (!p) return null
                const unitPrice = cur === 'rm' ? p.price.myr : p.price.twd
                return (
                  <div key={item.productId} className="drawer-item">
                    <img src={p.image} alt={t(p.name.zh, p.name.en)} />
                    <div className="drawer-item-body">
                      <div className="drawer-item-name">
                        {t(p.name.zh, p.name.en)}
                      </div>
                      <div className="drawer-item-meta">
                        {t(p.meta.zh, p.meta.en)}
                      </div>
                      <div className="drawer-item-foot">
                        <div className="qty">
                          <button
                            type="button"
                            onClick={() => updateQuantity(p.id, item.quantity - 1)}
                            aria-label="−"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(p.id, item.quantity + 1)}
                            aria-label="+"
                          >
                            +
                          </button>
                        </div>
                        <span className="drawer-item-price">
                          {symbol} {unitPrice.toLocaleString()}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="drawer-item-remove"
                        onClick={() => remove(p.id)}
                      >
                        {t('移除', 'Remove')}
                      </button>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-row">
              <span>{t('小計', 'Subtotal')}</span>
              <span>
                {symbol} {sub.toLocaleString()}
              </span>
            </div>
            <div className="drawer-row">
              <span>{t('運費', 'Shipping')}</span>
              <span>
                {shipping === 0
                  ? t('免運', 'Free')
                  : `${symbol} ${shipping}`}
              </span>
            </div>
            <div className="drawer-row drawer-total">
              <span>{t('總計', 'Total')}</span>
              <span className="serif">
                {symbol} {total.toLocaleString()}
              </span>
            </div>
            <button type="button" className="btn drawer-checkout">
              {t('前往結帳 →', 'CHECKOUT →')}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
