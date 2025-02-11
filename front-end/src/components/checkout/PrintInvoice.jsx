import React from 'react';
import { Printer } from 'lucide-react';

const PrintInvoice = ({ items, subtotal, deliveryFee, taxes, total }) => {
  const printStyles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      color: '#C41E3A',
      textAlign: 'center',
      marginBottom: '20px'
    },
    footer: {
      marginTop: '40px',
      textAlign: 'center',
      fontSize: '12px'
    },
    itemContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    itemName: {
      fontWeight: 'bold'
    },
    itemDetails: {
      color: '#666'
    },
    itemNote: {
      color: '#666',
      fontStyle: 'italic'
    },
    price: {
      fontWeight: 'bold',
      color: '#C41E3A'
    },
    summary: {
      borderTop: '1px solid #eee',
      paddingTop: '1rem'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0.5rem 0'
    },
    total: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem',
      fontWeight: 'bold'
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('invoice-content');
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
      <div style="${Object.entries(printStyles.container).map(([k, v]) => `${k}:${v}`).join(';')}">
        <h1 style="${Object.entries(printStyles.header).map(([k, v]) => `${k}:${v}`).join(';')}">
          Big Fat Pizza - Invoice
        </h1>
        ${printContent.innerHTML}
        <div style="${Object.entries(printStyles.footer).map(([k, v]) => `${k}:${v}`).join(';')}">
          <p>Thank you for choosing Big Fat Pizza!</p>
          <p>For any queries, please contact us at support@bigfatpizza.com</p>
        </div>
      </div>
    `;

    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 text-[#6B4226] hover:text-[#C41E3A] transition-colors"
      >
        <Printer className="w-5 h-5" />
        <span>Print Invoice</span>
      </button>

      <div id="invoice-content" className="hidden">
        <div className="space-y-6">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="py-4">
                <div style={printStyles.itemContainer}>
                  <div>
                    <h3 style={printStyles.itemName}>{item.name}</h3>
                    <p style={printStyles.itemDetails}>
                      {item.customizations?.size?.name} × {item.quantity}
                    </p>
                    {item.customizations?.toppings?.length > 0 && (
                      <p style={printStyles.itemDetails}>
                        Toppings: {item.customizations.toppings.map(t => t.name).join(', ')}
                      </p>
                    )}
                    {item.specialInstructions && (
                      <p style={printStyles.itemNote}>
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>
                  <p style={printStyles.price}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={printStyles.summary}>
            <div style={printStyles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={printStyles.summaryRow}>
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div style={printStyles.summaryRow}>
              <span>Taxes</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div style={printStyles.total}>
              <span>Total</span>
              <span style={{ color: '#C41E3A' }}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintInvoice;