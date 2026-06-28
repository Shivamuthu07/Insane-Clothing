import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, Truck, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

const FREE_SHIPPING_THRESHOLD = 999;
const PROMO_CODES = { 'INSANE10': 10, 'SNITCH15': 15, 'NEW20': 20 };

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemove, onClear }) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = appliedPromo ? Math.round(subtotal * (appliedPromo.pct / 100)) : 0;
  const total = subtotal - discount;
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, pct: PROMO_CODES[code] });
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try INSANE10, SNITCH15 or NEW20.');
    }
  };

  const handleCheckout = () => {
    confetti({ particleCount: 160, spread: 80, origin: { y: 0.55 }, colors: ['#ff3c00', '#ff7a00', '#ffffff'] });
    setIsSuccess(true);
  };

  const handleContinue = () => {
    setIsSuccess(false);
    onClear();
    setAppliedPromo(null);
    setPromoInput('');
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 600 }}>
      {/* Backdrop */}
      <div
        id="cart-backdrop"
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)', animation: 'fadeIn 0.2s ease' }}
      />

      {/* Drawer Panel */}
      <div
        id="cart-panel"
        style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: '100%', maxWidth: 440,
          background: 'var(--c-surface)',
          display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {isSuccess ? (
          /* ── Success Screen ── */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center', gap: '20px' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--c-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={44} color="#fff" />
            </div>
            <h2 className="title-md" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', textTransform: 'uppercase' }}>Order Placed!</h2>
            <p style={{ color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
              Your order has been confirmed and will be shipped within 2–3 business days.
            </p>
            <div style={{ background: 'var(--c-surface-2)', borderRadius: 'var(--r-md)', padding: '16px 24px', width: '100%' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)' }}>Order Total</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem' }}>₹{total.toLocaleString()}</p>
            </div>
            <button id="cart-success-continue" className="btn btn-primary" onClick={handleContinue} style={{ width: '100%', padding: '14px' }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={20} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                  Your Bag
                </h2>
                {cartItems.length > 0 && (
                  <span style={{ background: 'var(--c-accent)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 7px', borderRadius: 'var(--r-full)' }}>
                    {cartItems.reduce((a, i) => a + i.qty, 0)}
                  </span>
                )}
              </div>
              <button id="cart-close-btn" className="btn-ghost" onClick={onClose} aria-label="Close cart" style={{ borderRadius: '50%', padding: '6px' }}>
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cartItems.length > 0 && (
              <div style={{ padding: '12px 24px', background: 'var(--c-surface-2)', borderBottom: '1px solid var(--c-border)' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={14} />
                  {shippingRemaining === 0
                    ? '🎉 You\'ve unlocked FREE shipping!'
                    : <>Add <strong>₹{shippingRemaining.toLocaleString()}</strong> more for FREE shipping</>
                  }
                </p>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${shippingProgress}%` }} />
                </div>
              </div>
            )}

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: cartItems.length ? '0' : '0' }}>
              {cartItems.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', color: 'var(--c-text-muted)', padding: '40px' }}>
                  <ShoppingBag size={56} strokeWidth={1} />
                  <p style={{ fontWeight: 600, fontSize: '1rem' }}>Your bag is empty</p>
                  <p style={{ fontSize: '0.85rem', textAlign: 'center' }}>Add some pieces from our collection to get started.</p>
                  <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '8px' }}>Browse Products</button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartId} style={{ display: 'flex', gap: '14px', padding: '18px 24px', borderBottom: '1px solid var(--c-border)' }}>
                    {/* Thumbnail */}
                    <div style={{ width: 80, height: 100, borderRadius: 'var(--r-sm)', overflow: 'hidden', flexShrink: 0, background: 'var(--c-surface-2)' }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--c-text-muted)' }}>{item.category}</p>
                      <p style={{ fontWeight: 600, fontSize: '0.88rem', lineHeight: 1.3 }}>{item.name}</p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--c-text-muted)' }}>Size: <strong>{item.size}</strong></p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                        {/* Qty stepper */}
                        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--c-border)', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
                          <button
                            id={`cart-minus-${item.cartId}`}
                            onClick={() => onUpdateQty(item.cartId, -1)}
                            style={{ padding: '4px 10px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                          >−</button>
                          <span style={{ padding: '4px 8px', fontWeight: 700, fontSize: '0.85rem', borderLeft: '1.5px solid var(--c-border)', borderRight: '1.5px solid var(--c-border)', minWidth: 28, textAlign: 'center' }}>
                            {item.qty}
                          </span>
                          <button
                            id={`cart-plus-${item.cartId}`}
                            onClick={() => onUpdateQty(item.cartId, 1)}
                            style={{ padding: '4px 10px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                          >+</button>
                        </div>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem' }}>
                          ₹{(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      id={`cart-remove-${item.cartId}`}
                      onClick={() => onRemove(item.cartId)}
                      aria-label="Remove item"
                      className="btn-ghost"
                      style={{ alignSelf: 'flex-start', padding: '4px', color: 'var(--c-text-light)', borderRadius: 'var(--r-sm)' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid var(--c-border)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Promo Code */}
                {appliedPromo ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--c-accent-light)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--c-accent)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag size={14} color="var(--c-accent)" />
                      <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--c-accent)' }}>
                        {appliedPromo.code} — {appliedPromo.pct}% OFF applied!
                      </span>
                    </div>
                    <button
                      id="remove-promo-btn"
                      onClick={() => { setAppliedPromo(null); setPromoInput(''); }}
                      className="btn-ghost"
                      style={{ padding: '2px', color: 'var(--c-accent)' }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      id="promo-input"
                      className="input"
                      type="text"
                      placeholder="Enter promo code"
                      value={promoInput}
                      onChange={e => { setPromoInput(e.target.value); setPromoError(''); }}
                      style={{ flex: 1, padding: '9px 12px', fontSize: '0.85rem' }}
                    />
                    <button id="apply-promo-btn" type="submit" className="btn btn-outline" style={{ padding: '9px 16px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p id="promo-error" style={{ fontSize: '0.75rem', color: 'var(--c-accent)', marginTop: '-8px', fontWeight: 500 }}>{promoError}</p>
                )}

                {/* Price Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--c-text-muted)' }}>
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {appliedPromo && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--c-success)', fontWeight: 600 }}>
                      <span>Discount ({appliedPromo.pct}%)</span>
                      <span>−₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--c-text-muted)' }}>
                    <span>Shipping</span>
                    <span style={{ color: shippingRemaining === 0 ? 'var(--c-success)' : undefined, fontWeight: shippingRemaining === 0 ? 700 : 400 }}>
                      {shippingRemaining === 0 ? 'FREE' : `₹${(subtotal >= 499 ? 49 : 99).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="divider" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem' }}>
                    <span>Total</span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout */}
                <button
                  id="checkout-btn"
                  className="btn btn-accent"
                  onClick={handleCheckout}
                  style={{ width: '100%', padding: '15px', fontSize: '0.95rem', letterSpacing: '0.04em' }}
                >
                  PROCEED TO CHECKOUT
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--c-text-light)' }}>
                  Secure checkout · 256-bit SSL encrypted
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
