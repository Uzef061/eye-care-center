import React, { useState } from 'react';
import ProductModal from './ProductModal';
import { Search, Eye, CheckCircle2, XCircle, Filter, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function EyewearSection({ products, onEnquireProduct }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { t, formatPrice } = useLanguage();

  const categories = [
    "All",
    "Prescription Glasses",
    "Power Glasses",
    "Sunglasses",
    "Reading Glasses",
    "Computer Glasses",
    "Kids' Frames",
    "Contact Lenses"
  ];

  // Filtering Logic
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-primary">{t('eyewear_badge')}</div>
          <h2>{t('eyewear_title')}</h2>
          <p>{t('eyewear_desc')}</p>
        </div>

        {/* Filter Bar & Search Input */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none'
          }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: selectedCategory === cat ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--color-text-secondary)',
                  boxShadow: selectedCategory === cat ? '0 4px 12px rgba(217, 119, 6, 0.3)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', maxWidth: '450px' }}>
            <input 
              type="text"
              className="form-input"
              placeholder="Search by model, power type, frame material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
            />
            <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <Filter size={48} color="var(--color-text-muted)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No eyewear models found</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
              Try searching with a different keyword or select another category filter.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="card" style={{ padding: '1.25rem' }}>
                {/* Product Image */}
                <div style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '1rem',
                  backgroundColor: 'var(--color-bg-secondary)',
                  height: '220px'
                }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Availability Badge Overlay */}
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                    {product.available ? (
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                        {t('eyewear_in_stock')}
                      </span>
                    ) : (
                      <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
                        {t('eyewear_out_of_stock')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-primary)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  {product.category}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                  {product.name}
                </h3>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
                  {formatPrice(product.price)}
                </div>

                {/* Actions */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ flex: 1 }}
                    onClick={() => setSelectedProduct(product)}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    disabled={!product.available}
                    onClick={() => onEnquireProduct(product)}
                  >
                    {t('eyewear_enquire')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEnquire={(prod) => onEnquireProduct(prod)}
        />
      )}
    </section>
  );
}
