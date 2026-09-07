import { useEffect } from 'react'

const BUY_BUTTON_ID = 'buy_btn_1UCv2CHK0D5cpWg5mriY6BNH'
const PUBLISHABLE_KEY =
  'pk_test_51UCuyAHK0D5cpWg5KXIz4gpEiOOYDzKsTU9O0h7vDrGdWLVf9g5cG45DPqIXdMOeQ66KeVpiPAYKzcDQVmRvezRI00FDdxuupp'

/** Stripe Payment Link Buy Button (test/sandbox). Safe to remove / revert later. */
export function StripeBuyButton() {
  useEffect(() => {
    const existing = document.querySelector('script[data-stripe-buy-button]')
    if (existing) return

    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/buy-button.js'
    script.async = true
    script.dataset.stripeBuyButton = 'true'
    document.body.appendChild(script)
  }, [])

  return (
    <div className="stripe-buy-button-wrap">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-amber-700">
        Stripe test mode — sandbox checkout
      </p>
      <stripe-buy-button buy-button-id={BUY_BUTTON_ID} publishable-key={PUBLISHABLE_KEY} />
    </div>
  )
}
