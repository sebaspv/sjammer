from fastapi import APIRouter
import typing
import json
import rpack

router = APIRouter(prefix="", tags=["Furniture"])


@router.post("/jamit")
async def jamit(furniture: list[list[int]], dims: list[int], muebles: list[str]):
    rectangles = [[int(i), int(k)] for i, k in furniture]
    furniture_coords = []
    otims = []
    for i in rectangles:
        furniture_coords.append((i[0], i[1])) # ancho, altura
    for i in dims:
        otims.append(int(i))
    sols = []
    sol = rpack.pack(furniture_coords, max_width=dims[0], max_height=dims[1])
    for i, k in enumerate(sol):
        sols.append([k[0], k[1] + furniture_coords[i][1]])
    newm = []
    for i, k in enumerate(sols):
        k.append(muebles[i])
        k.append(furniture[i])
        newm.append(k)
    return {"coords": newm}
