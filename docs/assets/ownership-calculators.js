(() => {
 'use strict';
 const currency = value => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
 document.querySelectorAll('[data-calculator]').forEach(box => {
  const output = box.querySelector('output');
  const value = name => Math.max(0, Number(box.querySelector(`[name="${name}"]`)?.value) || 0);
  const update = () => {
   if (box.dataset.calculator === 'seller') {
    const cost = value('sale') * value('rate') / 100 + value('other') + value('credits');
    output.textContent = `Scenario selling costs: ${currency(cost)}. Estimated cash after these costs and entered loan payoff: ${currency(value('sale') - cost - value('payoff'))}. Taxes on gain are not calculated.`;
   } else {
    const operating = ['taxes','insurance','utilities','hoa','maintenance','reserve','management'].reduce((total,key) => total + value(key),0);
    output.textContent = `Annual operating costs and entered reserves: ${currency(operating)}. Annual cash including entered debt payments: ${currency(operating + value('debt'))}. Monthly equivalent: ${currency((operating + value('debt')) / 12)}. Unknown costs may still be missing.`;
   }
  };
  box.addEventListener('input',update);update();
 });
})();
