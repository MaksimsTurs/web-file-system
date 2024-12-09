import type { ExplorerConfigurationDeletePath, ExplorerConfigurationInsertPathData } from "@/hooks/use-file-explorer/type/fileExplorerConfigurations.type"
import type { SetModesValueData } from "@/hooks/use-file-explorer/type/fileExplorerModes.type"
import type { PayloadAction } from "@reduxjs/toolkit"

export type InsertPathToConfigPayload = PayloadAction<ExplorerConfigurationInsertPathData>

export type DeletePathFromConfigPayload = PayloadAction<ExplorerConfigurationDeletePath>

export type SetModesValuePayload = PayloadAction<SetModesValueData>