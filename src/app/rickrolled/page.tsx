export default function Rickrolled() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-black p-6 rounded shadow-md text-center space-y-4">
        <h1 className="text-2xl font-bold">You&apos;ve been RICKROLLED!</h1>
        <p className="text-lg">Lesson: Don&apos;t click random links. They can get you hacked or RICKROLLED!!!!</p>
        <div className="aspect-video w-full max-w-xl mx-auto">
          <iframe
            width="864"
            height="486"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
