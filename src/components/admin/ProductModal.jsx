import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { categories } from '../../data/categories';
import { useAppData } from '../../context/AppDataContext';

export const ProductModal = ({ isOpen, onClose, productToEdit = null }) => {
  const { addProduct, updateProduct } = useAppData();

  const [formData, setFormData] = useState({
    name: '',
    category: 'milk',
    price: '',
    originalPrice: '',
    unit: '1 Litre',
    stockCount: 50,
    shortDescription: '',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || 'milk',
        price: productToEdit.price || '',
        originalPrice: productToEdit.originalPrice || '',
        unit: productToEdit.unit || '1 Litre',
        stockCount: productToEdit.stockCount || 50,
        shortDescription: productToEdit.shortDescription || '',
        image: productToEdit.image || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'milk',
        price: '',
        originalPrice: '',
        unit: '1 Litre',
        stockCount: 50,
        shortDescription: '',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
      });
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const catObj = categories.find(c => c.slug === formData.category);

    const payload = {
      ...formData,
      categoryName: catObj ? catObj.name : 'Dairy',
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      stockCount: Number(formData.stockCount)
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, payload);
    } else {
      addProduct(payload);
    }
    onClose();
  };

  const categoryOptions = categories.map(c => ({
    value: c.slug,
    label: c.name
  }));

  const unitOptions = [
    { value: '1 Litre', label: '1 Litre' },
    { value: '500ml', label: '500ml' },
    { value: '300ml', label: '300ml' },
    { value: '500g', label: '500g' },
    { value: '250g', label: '250g' },
    { value: '200g', label: '200g' },
    { value: '400g', label: '400g' },
    { value: '1 kg', label: '1 kg' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? "Edit Dairy Product" : "Add New Dairy Product"}
      subtitle="Update inventory, retail price, and category specifications"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Product Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. A2 Gir Cow Vedic Milk"
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categoryOptions}
          />
          <Select
            label="Standard Unit"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            options={unitOptions}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Price (₹)"
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="65"
          />
          <Input
            label="MRP (₹)"
            type="number"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
            placeholder="75"
          />
          <Input
            label="Stock Units"
            type="number"
            value={formData.stockCount}
            onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
            placeholder="50"
          />
        </div>

        <Input
          label="Short Description"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          placeholder="Brief product benefits..."
        />

        <Input
          label="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://..."
        />

        <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {productToEdit ? "Save Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;

