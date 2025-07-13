import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemplateById, updateTemplate } from '../api/templates';
import { AuthContext } from '../context/AuthContext';

const TemplateEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);
  const token = authData?.token;

  const [template, setTemplate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const data = await getTemplateById(id);
        setTemplate(data);
      } catch (err) {
        setError(err.message || 'Failed to load template');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTemplate(id, template, token);
      navigate('/templates');
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Edit Template</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={template.name}
            onChange={(e) => setTemplate({ ...template, name: e.target.value })}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={template.description || ''}
            onChange={(e) => setTemplate({ ...template, description: e.target.value })}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Format</label>
          <input
            type="text"
            value={template.format || ''}
            onChange={(e) => setTemplate({ ...template, format: e.target.value })}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default TemplateEditPage;
