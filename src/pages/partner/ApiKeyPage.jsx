import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import ApiKeyItem from './ApiKeyItem.jsx';
import {Button, TextInput} from '@mantine/core';
import {FaTrash} from 'react-icons/fa';
import {createKey, deleteKey} from '../../modules/api-key.js';
import {revalidateCache} from '../../modules/cache.js';

const mockApiKeys = [
  {
    id: 1,
    key: 'API_KEY_123456API_KEY_123456API_KEY_123456API_KEY_123456API_KEY_123456API_KEY_123456API_KEY_123456API_KEY_123456API_KEY_123456API_KEY_123456API_KEY_123456API_KEY_123456',
    name: 'Key 1',
  }, {id: 2, key: 'API_KEY_abcdef', name: 'Key 2'}, {id: 3, key: 'API_KEY_789xyz', name: 'Key 3'},
];

// Hàm gọi API để lấy danh sách API keys
const fetchApiKeys = async () => {
  const res = await fetch('/api/keys');
  if (!res.ok) throw new Error('Error fetching API keys');
  return res.json();
};

function ApiKeyPage() {
  const {data: apiKeys, isLoading, isError} = useQuery({
    queryKey: ['apiKeys'], queryFn: fetchApiKeys,
  });
  const [newApiKeyName, setNewApiKeyName] = useState('');

  const handleAddKey = () => {
    createKey(newApiKeyName).then(() => {
      revalidateCache('apiKeys').then();
      setNewApiKeyName('');
    });
  };

  const handleDeleteKey = (id) => {
    deleteKey(id).then(() => {
      revalidateCache('apiKeys').then();
    });
  };

  return (<div className="p-10 w-full mx-auto">
    <h1 className="text-2xl font-semibold mb-4">Quản lý API Keys</h1>
    <div className="mb-4 flex items-center gap-2">
      <TextInput
          size={'md'}
          className="grow-[1]"
          value={newApiKeyName}
          onChange={(event) => setNewApiKeyName(event.currentTarget.value)}
          placeholder="Nhập tên API Key"
      />
      <Button
          onClick={handleAddKey}
          className="text-white"
      >
        Thêm
      </Button>
    </div>

    {/* Table để hiển thị API keys */}
    <table className="min-w-full table-auto">
      <thead className={'rounded-2xl'}>
      <tr className="bg-gray-200">
        <th className="px-4 py-2">Tên API</th>
        <th className="px-4 py-2">API Key</th>
      </tr>
      </thead>
      <tbody>
      {mockApiKeys.map((key) => (<tr key={key.id} className="border-b">
        <td className="px-4 py-2 text-center w-1/3">{key.name}</td>
        <td className="px-4 py-2 text-center shrink-0 max-w-[40%]">
          <div className={'flex items-center'}>
            <ApiKeyItem apiKey={key}/>
            <div
                onClick={() => handleDeleteKey(key.id)}
                className="p-2 ml-2"
            >
              <FaTrash/>
            </div>
          </div>
        </td>
      </tr>))}
      </tbody>
    </table>
  </div>);
}

export default ApiKeyPage;
