import { useForm } from 'react-hook-form';
import React from 'react';

type FormValues = {
  items: string[];
};

function App() {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      items: ['りんご', 'みかん'],
    },
  });


  // refの動作を確認するためのカスタムref
  const customRef = (element: HTMLInputElement | null) => {
    if (element) {
      console.log('--- ref callback が呼ばれました ---');
      console.log('element value:', element.value);
      console.log('element defaultChecked:', element.defaultChecked);
      console.log('element checked:', element.checked);
      console.log('------------------------');
    }
  };

  const itemsValue = watch('items');

  // React Hook Form管理のチェックボックスの監視
  React.useEffect(() => {
    const controlledCheckboxes = document.querySelectorAll('input[name="items"]') as NodeListOf<HTMLInputElement>;

    controlledCheckboxes.forEach((checkbox) => {
      console.log('---チェックボックスの状態 ---');
      console.log('value:', checkbox.value);
      console.log('defaultChecked:', checkbox.defaultChecked);
      console.log('checked:', checkbox.checked);
      console.log('------------------------');
    });
  }, [itemsValue]);


  const onSubmit = (data: FormValues) => {
    console.log('data:', data);
  };

  const items = [
    {
      label: 'りんご',
      value: 'りんご',
    },
    {
      label: 'みかん',
      value: 'みかん',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        {items.map((item) => (
          <label key={item.value}>
            <input
              type="checkbox"
              value={item.value}
              {...register('items')}
              ref={(element) => {
                register('items').ref(element);
                customRef(element);
              }}
            />
            {item.label}
            <br />
          </label>
        ))}
        <input type="submit" value="送信" />
      </form>
    </div>
  );
}

export default App;
