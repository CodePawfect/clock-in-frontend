import {describe, expect, test, vi} from "vitest";
import {renderHook} from "@testing-library/react";
import {useAddWorkTimeModal} from "./useAddWorkTimeModal.ts";
import {act} from "react";

describe("useAddWorkTimeModal", () => {

    test("should send create work time http post request", async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
        });
        vi.stubEnv("VITE_API_BASE_URL", "http://localhost:3000");

        const {result} = renderHook(() => useAddWorkTimeModal());

        act(() => {
            result.current.setNewWorkTimeDate("2025-10-01");
            result.current.setNewWorkTimeHours(5);
            result.current.setNewWorkTimeNote("Test Note");
        });

        await act(async () => {
            await result.current.createWorkTime();
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/worktimes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    date: "2025-10-01",
                    hoursWorked: 5,
                    note: "Test Note",
                }),
                credentials: "include",
            }
        );

        expect(result.current.open).toBe(false);

        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    })
})