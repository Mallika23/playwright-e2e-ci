export function productSlug(productName: string): string {
    return productName.toLowerCase().replace(/\s+/g, '-');
}
