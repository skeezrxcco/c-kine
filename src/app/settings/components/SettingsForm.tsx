import React from 'react';
import { Switch } from './Switch';

interface Field {
  name: string;
  label: string;
  type: string;
  value: any;
  options?: { value: string; label: string }[];
}

interface SettingsFormProps {
  fields: Field[];
  onSubmit: (values: any) => void;
}

export function SettingsForm({ fields, onSubmit }: SettingsFormProps) {
  const [values, setValues] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    const initialValues = fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.value,
    }), {});
    setValues(initialValues);
  }, [fields]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'switch':
        return (
          <Switch
            checked={values[field.name] || false}
            onChange={(checked) => handleChange(field.name, checked)}
          />
        );
      case 'select':
        return (
          <select
            value={values[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={values[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        );
      default:
        return (
          <input
            type={field.type}
            value={values[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <div className="mt-1">{renderField(field)}</div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}