'use client';
import { useState } from 'react';

export default function SaleForm({ onBack }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Dinheiro');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newItem = {
      id: Date.now(),
      name,
      quantity: Number(quantity),
      price: Number(price),
      total: Number(quantity) * Number(price)
    };

    setItems([...items, newItem]);
    setName('');
    setQuantity(1);
    setPrice('');
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCancelSale = () => {
    if (confirm('Tem certeza de que deseja cancelar esta venda?')) {
      setItems([]);
      onBack();
    }
  };

  const totalGeneral = items.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className='min-h-screen bg-[#0A1128] text-white p-4 max-w-md mx-auto flex flex-col justify-between'>
      <div>
        <header className='flex justify-between items-center mb-6 border-b border-[#D4AF37]/30 pb-4'>
          <h1 className='text-lg font-bold text-[#D4AF37]'>Registar Nova Venda</h1>
          <button onClick={onBack} className='text-xs bg-[#101F42] border border-[#D4AF37]/40 px-3 py-1 rounded text-[#D4AF37] hover:bg-[#D4AF37]/15 transition'>Voltar</button>
        </header>

        <form onSubmit={handleAddItem} className='space-y-4'>
          <div className='bg-[#101F42] p-4 rounded-xl border border-[#D4AF37]/20 space-y-3'>
            <div>
              <label className='block text-xs text-gray-400 mb-1'>Nome do Produto / Artigo</label>
              <input 
                type='text' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Ex: Arroz, Óleo, Refrigerante...' 
                className='w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]' 
              />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-xs text-gray-400 mb-1'>Quantidade</label>
                <input 
                  type='number' 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min='1' 
                  className='w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]' 
                />
              </div>
              <div>
                <label className='block text-xs text-gray-400 mb-1'>Preço Unitário (MT)</label>
                <input 
                  type='number' 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder='0,00' 
                  className='w-full bg-[#0A1128] border border-[#D4AF37]/30 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37]' 
                />
              </div>
            </div>
            <button type='submit' className='w-full bg-[#101F42] border border-[#D4AF37] text-[#D4AF37] font-semibold py-2 rounded-lg hover:bg-[#D4AF37]/10 transition text-xs'>
              + Adicionar à Venda
            </button>
          </div>

          {items.length > 0 && (
            <div className='bg-[#101F42] p-3 rounded-xl border border-[#D4AF37]/20 space-y-2 max-h-36 overflow-y-auto'>
              <p className='text-xs text-[#D4AF37] font-semibold'>Itens Adicionados:</p>
              {items.map((item) => (
                <div key={item.id} className='flex justify-between items-center text-xs border-b border-gray-700 pb-1.5'>
                  <div>
                    <span className='font-medium'>{item.quantity}x {item.name}</span>
                    <span className='text-[#D4AF37] ml-2'>({item.total.toFixed(2)} MT)</span>
                  </div>
                  <button 
                    type='button' 
                    onClick={() => handleRemoveItem(item.id)}
                    className='text-red-400 hover:text-red-300 px-2 py-0.5 rounded border border-red-500/30 text-[10px]'
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className='bg-[#101F42] p-4 rounded-xl border border-[#D4AF37]/20 flex justify-between items-center'>
            <span className='text-sm text-gray-400'>Total a Pagar:</span>
            <span className='text-xl font-bold text-[#D4AF37]'>{totalGeneral.toFixed(2)} MT</span>
          </div>

          <div className='bg-[#101F42] p-4 rounded-xl border border-[#D4AF37]/20 space-y-2'>
            <label className='block text-xs text-gray-400'>Forma de Pagamento</label>
            <div className='grid grid-cols-3 gap-2'>
              {['Dinheiro', 'M-Pesa', 'E-Mola'].map((method) => (
                <button
                  key={method}
                  type='button'
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 text-xs rounded-lg border transition font-semibold ${
                    paymentMethod === method
                      ? 'bg-[#D4AF37] text-[#0A1128] border-[#D4AF37]'
                      : 'bg-[#0A1128] text-gray-300 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-2 pt-1'>
            <button 
              type='button' 
              disabled={items.length === 0}
              className='w-full bg-[#D4AF37] text-[#0A1128] font-bold p-3 rounded-xl hover:bg-[#b8972d] transition disabled:opacity-50 text-sm'
            >
              Concluir Venda ({paymentMethod})
            </button>
            <button 
              type='button' 
              onClick={handleCancelSale}
              className='w-full bg-transparent border border-red-500/50 text-red-400 font-semibold py-2 rounded-xl hover:bg-red-500/10 transition text-xs'
            >
              Cancelar Venda
            </button>
          </div>
        </form>
      </div>

      <footer className='mt-8 pt-4 border-t border-[#D4AF37]/20 text-center text-xs text-gray-400'>
        <p>Desenvolvido por Jaime Cussara Omar</p>
        <p className='text-[#D4AF37] mt-1'>&copy; 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}