export default function FormError({ error }) {
    if (!error) {
        return <></>;
    }
    return <label class="text-red-500">{error}</label>;
}
