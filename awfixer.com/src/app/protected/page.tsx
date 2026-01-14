import { AuthGuard } from '@/components/auth-guard';
import { useAuth } from '@/hooks/use-auth';

export default function ProtectedPage() {
  const { user, subscription } = useAuth();

  return (
    <AuthGuard requiredTier="Gold" requireActive={true}>
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Gold Tier Content
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Gold Tier Exclusive Content
          </h2>
          <div className="prose prose-indigo max-w-none">
            <p className="text-lg mb-4">
              Welcome, {user?.name}!
            </p>
            <p className="text-gray-600 mb-6">
              Thank you for being a Gold tier patron! This content is specially created for our most dedicated supporters.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">
              Gold Tier Benefits:
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-left">
              <li className="flex items-center">
                <span className="font-medium">✅ Access to exclusive tutorials and guides</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">✅ Early access to new features</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">✅ Priority support requests</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">✅ Private Discord community access</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium">✅ Behind-the-scenes content</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}