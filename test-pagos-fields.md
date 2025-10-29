# Prueba de Campos Adicionales para Pagos

## Campos Agregados

Cuando se selecciona el método de pago "Pagos", se mostrarán los siguientes campos adicionales organizados en una **estructura de grid responsiva**:

### Estructura del Grid
- **Mobile (1 columna)**: Todos los campos se muestran en una sola columna
- **Desktop (2 columnas)**: Los campos se organizan en 2 columnas, excepto la dirección que ocupa el ancho completo

### Campos Requeridos (Organizados en Grid)

#### Fila 1 - Ancho completo
1. **Dirección** (`address`) - `md:col-span-2`
   - Valor por defecto: "Calle 45 #18A-27"
   - Tipo: text
   - Requerido: Sí

#### Fila 2 - Dos columnas
2. **Estado/Departamento** (`state`) - Columna 1
   - Valor por defecto: "co"
   - Tipo: text
   - Requerido: Sí

3. **Ciudad** (`city`) - Columna 2
   - Valor por defecto: "Bogotá"
   - Tipo: text
   - Requerido: Sí

#### Fila 3 - Dos columnas
4. **Código Postal** (`zip`) - Columna 1
   - Valor por defecto: "110111"
   - Tipo: text
   - Requerido: Sí

5. **Fecha de Nacimiento** (`birth_date`) - Columna 2
   - Valor por defecto: "1985-03-15"
   - Tipo: date
   - Requerido: Sí

#### Fila 4 - Dos columnas
6. **Número de Teléfono** (`phone_no`) - Columna 1
   - Valor por defecto: "5330012345"
   - Tipo: tel
   - Requerido: Sí

7. **Número de Identificación** (`tax_id`) - Columna 2
   - Valor por defecto: "1.024.567.890"
   - Tipo: text
   - Requerido: Sí

## Traducciones Agregadas

### Español
- `deposit.address`: "Dirección"
- `deposit.state`: "Estado/Departamento"
- `deposit.city`: "Ciudad"
- `deposit.zip`: "Código postal"
- `deposit.birth_date`: "Fecha de nacimiento"
- `deposit.phone_no`: "Número de teléfono"
- `deposit.tax_id`: "Número de identificación"

### Inglés
- `deposit.address`: "Address"
- `deposit.state`: "State"
- `deposit.city`: "City"
- `deposit.zip`: "ZIP Code"
- `deposit.birth_date`: "Birth Date"
- `deposit.phone_no`: "Phone Number"
- `deposit.tax_id`: "Tax ID"

### Portugués
- `deposit.address`: "Endereço"
- `deposit.state`: "Estado"
- `deposit.city`: "Cidade"
- `deposit.zip`: "CEP"
- `deposit.birth_date`: "Data de Nascimento"
- `deposit.phone_no`: "Número de Telefone"
- `deposit.tax_id`: "CPF/CNPJ"

### Árabe
- `deposit.address`: "العنوان"
- `deposit.state`: "الولاية"
- `deposit.city`: "المدينة"
- `deposit.zip`: "الرمز البريدي"
- `deposit.birth_date`: "تاريخ الميلاد"
- `deposit.phone_no`: "رقم الهاتف"
- `deposit.tax_id`: "رقم الهوية الضريبية"

### Francés
- `deposit.address`: "Adresse"
- `deposit.state`: "État/Province"
- `deposit.city`: "Ville"
- `deposit.zip`: "Code postal"
- `deposit.birth_date`: "Date de naissance"
- `deposit.phone_no`: "Numéro de téléphone"
- `deposit.tax_id`: "Numéro d'identification fiscale"

## Comportamiento

1. **Cuando se selecciona "Pagos"**: Los campos adicionales aparecen automáticamente con valores por defecto en estructura de grid
2. **Cuando se selecciona otro método**: Los campos adicionales se ocultan y se limpian
3. **Validación**: Todos los campos son requeridos cuando están visibles
4. **Estilo**: Los campos mantienen el mismo estilo visual que los campos existentes
5. **Responsividad**: 
   - **Mobile**: Grid de 1 columna (`grid-cols-1`)
   - **Desktop**: Grid de 2 columnas (`md:grid-cols-2`)
   - **Espaciado**: Gap de 4 unidades entre campos (`gap-4`)

## Pruebas Recomendadas

1. **Funcionalidad básica**:
   - Seleccionar método "Pagos" y verificar que aparecen los campos adicionales en grid
   - Verificar que los valores por defecto se cargan correctamente
   - Cambiar a otro método de pago y verificar que los campos se ocultan
   - Volver a seleccionar "Pagos" y verificar que los valores por defecto se restauran

2. **Responsividad**:
   - Probar en móvil (1 columna)
   - Probar en desktop (2 columnas)
   - Verificar que la dirección ocupa el ancho completo en ambos casos

3. **Validación**:
   - Intentar enviar formulario con campos vacíos
   - Verificar mensajes de error

4. **Internacionalización**:
   - Probar en diferentes idiomas para verificar las traducciones
   - Verificar que las etiquetas se muestran correctamente en todos los idiomas

## Estructura CSS Aplicada

```css
/* Grid container */
.grid.grid-cols-1.md:grid-cols-2.gap-4

/* Address field (full width) */
.md:col-span-2

/* Regular fields */
.block (para labels)
```