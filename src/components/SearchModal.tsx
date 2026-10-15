import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products, formatPrice, addToCart, viewProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white rounded-xs shadow-2xl border border-neutral-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, áo khoác, t-shirt, chất liệu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full text-sm font-medium outline-none text-black placeholder:text-neutral-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2 text-xs">
          <span className="text-neutral-400 font-semibold uppercase text-[10px]">Gợi ý:</span>
          {['Tee', 'Trench Coat', 'Snap Overshirt', 'Linen Blazer', 'Kids Terry'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2 py-0.5 bg-white border border-neutral-200 hover:border-black rounded text-[11px] text-neutral-700 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-neutral-100">
          {results.length === 0 ? (
            <div className="text-center py-10 text-neutral-400 text-xs">
              Không tìm thấy sản phẩm nào khớp với từ khóa "{searchTerm}"
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  viewProduct(product.id);
                  onClose();
                }}
                className="py-3 flex items-center justify-between gap-4 hover:bg-neutral-50 px-2 rounded transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-14 object-cover rounded-xs bg-neutral-100"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-neutral-900 hover:text-black">{product.name}</h4>
                    <p className="text-[11px] text-neutral-500">{product.fit}</p>
                    <span className="font-mono text-xs font-bold text-black mt-0.5 block">
                      {formatPrice(product.priceVND, product.priceUSD)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white text-[11px] font-bold rounded-xs cursor-pointer shrink-0"
                >
                  Thêm vào giỏ
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
