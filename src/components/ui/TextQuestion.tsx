export default function TextQuestion({ name, register, error }) {
  return (
    <>
      <div className="w-full h-[56px] rounded-full border-2 border-base-grey-300">
        <input
          type="text"
          className="rounded-full h-full px-4 w-full outline-none"
          {...register(name)}
        />
      </div>
      <div>{error && <p style={{ color: "red" }}>{error.message}</p>}</div>
    </>
  );
}
