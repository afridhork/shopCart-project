import { useRouter } from 'next/router';

const CustomSlugRoute = () => {
  const router = useRouter();
  const { asPath } = router;

  // Extract slugs from asPath
  const slugs = asPath.split('/').filter((segment) => segment !== '');

  // Handle the slugs as needed
  // For example, you can display them or redirect to another page

  return (
    <div>
      <h1>Custom Slug Route</h1>
      <p>Slugs: {slugs.join(' / ')}</p>
    </div>
  );
};

export default CustomSlugRoute;
