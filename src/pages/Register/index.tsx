export default function Register() {
    const id = 5;
    return (
        <>
            <h2>Registrar</h2>
            <form action="">
                <div className="field">
                    <label htmlFor="id"></label>
                    <input type="text" name="id" id="id" value={id} readOnly />
                </div>
                <div className="field">
                    <label htmlFor="categoria"></label>
                    <input type="text" name="categoria" id="id" required />
                </div>
            </form>
        </>
    );
};
