const useDeleteWorkTime = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const deleteWorkTime = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/worktimes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete work time');
    }

    if (response.status === 204) {
      return;
    }
  };

  return deleteWorkTime;
};

export default useDeleteWorkTime;
