import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'invoice',
        data: { pageTitle: 'Invoices' },
        loadChildren: () => import('./invoicedb/invoice/invoice.module').then(m => m.InvoicedbInvoiceModule),
      },
      {
        path: 'sale',
        data: { pageTitle: 'Sales' },
        loadChildren: () => import('./saledb/sale/sale.module').then(m => m.SaledbSaleModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
