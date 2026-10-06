import React, { useState } from 'react';
import { categories as initialCategories } from '../../data/categories';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { Plus, Edit2, Trash2, Layers, CheckCircle2 } from 'lucide-react';

export const AdminCategoriesPage = () => {
  const [categoryList, setCategoryList] = useState(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [catName, setCatName] = useState('');
  const [catCount, setCatCount] = useState(3);
  const [catDesc, setCatDesc] = useState('');

  const handleEdit = (cat) => {
    setEditingCat(cat);
    setCatName(cat.name);
    setCatCount(cat.count);
    setCatDesc(cat.description);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingCat(null);
    setCatName('');
    setCatCount(2);
    setCatDesc('');
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!catName) return;

    if (editingCat) {
      setCategoryList((prev) =>
        prev.map((c) =>
          c.id === editingCat.id
            ? { ...c, name: catName, count: Number(catCount), description: catDesc }
            : c
        )
      );
    } else {
      const newC = {
        id: `cat-${Date.now()}`,
        name: catName,
        slug: catName.toLowerCase().replace(/\s+/g, '-'),
        count: Number(catCount),
        description: catDesc,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
        badge: 'New'
      };
      setCategoryList((prev) => [...prev, newC]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setCategoryList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            Dairy Categories ({categoryList.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize customer product catalog into natural dairy product families.
          </p>
        </div>

        <Button onClick={handleCreate} variant="primary" size="md" icon={Plus}>
          Add Category
        </Button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryList.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 bg-white/95 text-slate-900 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                  Active
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                    {cat.count} Items Listed
                  </span>
                  <h3 className="text-lg font-black text-white leading-tight mt-0.5">
                    {cat.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 text-xs text-slate-600 leading-relaxed">
                <p>{cat.description}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                /{cat.slug}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-200 rounded-lg transition"
                  title="Edit Category"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCat ? "Edit Category" : "Add Dairy Category"}
        subtitle="Catalog grouping displayed on Customer homepage and shop"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <Input
            label="Category Name"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            placeholder="e.g. Fresh Paneer"
            required
          />

          <Input
            label="Number of Products"
            type="number"
            value={catCount}
            onChange={(e) => setCatCount(e.target.value)}
            required
          />

          <Input
            label="Description"
            value={catDesc}
            onChange={(e) => setCatDesc(e.target.value)}
            placeholder="Brief family description..."
          />

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <Button variant="outline" onClick={() => setModalOpen(false)} size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCategoriesPage;

